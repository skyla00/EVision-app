package com.springboot.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Component
public class JwtTokenizer {
    private final RedisTemplate<String, Object> redisTemplate;
    public JwtTokenizer(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Getter
    @Value("${jwt.key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    public String encodeBase64SecretKey (String secretKey) {
        // secretKey를 암호화.
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }
    // 해시함수로 암호화한 키.
    public Key getKeyFromBase64EncodeKey (String base64EncodedSecretKey) {
        // 디코딩 한 후에
        byte[] keyBytes = Decoders.BASE64URL.decode(base64EncodedSecretKey);
        // 다시 해시 함수로 암호화.
        Key key = Keys.hmacShaKeyFor(keyBytes);
        return key;
    }
    //AccessToken 받기.
    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodeKey(base64EncodedSecretKey);

        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();

        // Redis의 ListOperations 객체를 사용하여 리스트 형태로 데이터를 처리합니다.
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        // claims에 저장된 memberId(username)을 키로 accessToken 값을 추가합니다.
        valueOperations.set((String) claims.get("username"), accessToken, accessTokenExpirationMinutes, TimeUnit.MINUTES);
        return accessToken;
    }
    public String generateRefreshToken(String subject,
            Date expiration, String base64EncodedSecretKey, String accessToken) {
        Key key = getKeyFromBase64EncodeKey(base64EncodedSecretKey);

        String refreshToken = Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
        // Redis의 ListOperations 객체를 사용하여 리스트 형태로 데이터를 처리합니다.
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        // "accessToken"이라는 키에 accessToken 값을 리스트에 추가합니다.
        valueOperations.set(accessToken, refreshToken, refreshTokenExpirationMinutes, TimeUnit.MINUTES);
        return refreshToken;
    }

    //검증된 jwt만 받아짐.
    public Jws<Claims> getClaims (String jws, String baseEncodedSecretKey) {
        Key key = getKeyFromBase64EncodeKey(baseEncodedSecretKey);
        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);

        return claims;
    }

    public void verifySignature (String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodeKey(base64EncodedSecretKey);
        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    public Date getTokenExpiration (int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();
        return expiration;
    }

    // 로그아웃시 레디스에서 memberId를 기준으로 토큰 값 삭제
    public boolean deleteRegisterToken(String username) {
        return Optional.ofNullable(redisTemplate.hasKey(username))
                .filter(Boolean::booleanValue) // 키가 존재할 때만 진행
                .map(hasKey -> {
                    String accessToken = (String) redisTemplate.opsForValue().get(username);
                    redisTemplate.delete(accessToken);
                    redisTemplate.delete(username);
                    return true;
                })
                .orElse(false); // 키가 존재하지 않거나 삭제되지 않았을 때 false 반환
    }
}


