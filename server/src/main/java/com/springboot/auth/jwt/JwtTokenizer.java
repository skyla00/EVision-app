package com.springboot.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

@Component
public class JwtTokenizer {
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
    public String generateAccessToken (Map<String, Object> claims,
            String subject,
            Date expiration, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodeKey(base64EncodedSecretKey);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }
    public String generateRefreshToken(String subject,
            Date expiration, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodeKey(base64EncodedSecretKey);
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
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
}


