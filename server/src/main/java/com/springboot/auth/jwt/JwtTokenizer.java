package com.springboot.auth.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;

@Component
public class JwtTokenizer {
//    private final RedisTemplate<String, Object> redisTemplate;
//
//    public JwtTokenizer(RedisTemplate<String,Object> redisTemplate) {
//        this.redisTemplate = redisTemplate;
//    }

    @Getter
    @Value("${jwt.key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }
    public String generateAccessToken(Map<String,Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);
        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();

//        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
//        valueOperations.set((String) claims.get("username"), accessToken, accessTokenExpirationMinutes, TimeUnit.MINUTES);

        return accessToken;
    }
    public String generateRefreshToken(String subject,
                                       Date expiration,
                                       String base64EncodedSecretKey,
                                       String accessToken){

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);
        String refreshToken = Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();

//        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
//        valueOperations.set(accessToken, refreshToken, refreshTokenExpirationMinutes, TimeUnit.MINUTES);
        return refreshToken;
    }
    public Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey){
        byte[]keyBytes = Decoders.BASE64URL.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);
        return key;
    }

    public void verifySignature(String jws, String base64EncodedSecretKye){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKye);
        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);
        Jws<Claims>claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
        return claims;
    }

    public Date getTokenExpiration(int expirationMinutes){
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();
        return expiration;
    }

    // 로그아웃 시 레디스에서 memberId(username)을 기준으로 토큰 값 삭제.
//    public boolean deleteRegisterToken(String username) {
//
//        String accessTokenKey = username;
//        return Optional.ofNullable(redisTemplate.hasKey(accessTokenKey ))
//                .filter(Boolean::booleanValue) // 키가 존재할 때만 진행
//                .map(hasKey -> {
//                    String accessToken = (String) redisTemplate.opsForValue().get(accessTokenKey);
//                    String refreshTokenKey = accessToken;
//                    redisTemplate.delete(refreshTokenKey);
//                    redisTemplate.delete(accessTokenKey);
//
//                    return true;
//                })
//                .orElse(false); // 키가 존재하지 않거나 삭제되지 않았을 때 false 반환
//    }

    //
    public String delegateAccessToken(String username, List<String> permissions) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("permissions", permissions);
        claims.put("username", username);

        String subject = username;
        Date expiration = getTokenExpiration(getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());
        return generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    public String delegateRefreshToken(String username, String accessToken) {
        String subject = username;
        Date expiration = getTokenExpiration(getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());
        return generateRefreshToken(subject, expiration, base64EncodedSecretKey, accessToken);
    }
}
