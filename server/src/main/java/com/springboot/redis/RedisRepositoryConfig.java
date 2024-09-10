package com.springboot.redis;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
@EnableRedisRepositories // Redis 리포지토리를 활성화하여 Redis 데이터를 JPA처럼 다룰 수 있게 해주는 애너테이션
public class RedisRepositoryConfig {

    // application.properties 파일에서 Redis 서버의 호스트 주소를 가져오는 애너테이션
    @Value("${spring.data.redis.host}")
    private String host;

    // application.properties 파일에서 Redis 서버의 포트를 가져오는 애너테이션
    @Value("${spring.data.redis.port}")
    private int port;

    /**
     * RedisConnectionFactory 빈을 생성하는 메서드
     *
     * RedisConnectionFactory는 Redis 서버와의 연결을 관리하는 역할을 합니다.
     * Spring Data Redis는 이 팩토리를 통해 Redis 서버와의 모든 상호작용을 수행합니다.
     * RedisStandaloneConfiguration을 사용하여 Redis가 하나의 인스턴스(Standalone)로
     * 실행되고 있음을 설정합니다. 이 구성은 호스트와 포트 정보를 포함합니다.
     * LettuceConnectionFactory는 Redis와의 연결을 비동기적으로 관리하는 클라이언트 라이브러리입니다.
     * Lettuce는 비동기, 동시성 및 스레드 안정성을 지원하며, 다수의 Redis 명령어를 효율적으로 처리할 수 있습니다.
     *
     * @return RedisConnectionFactory
     */
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        // RedisStandaloneConfiguration 객체를 생성하여 Redis 서버의 호스트와 포트를 설정합니다.
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        redisStandaloneConfiguration.setHostName(host); // Redis 서버의 호스트 설정
        redisStandaloneConfiguration.setPort(port);     // Redis 서버의 포트 설정

        // LettuceConnectionFactory를 사용하여 Redis 연결을 설정합니다.
        // LettuceConnectionFactory는 연결 풀을 지원하고, Redis 명령어를 비동기적으로 처리합니다.
        LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory(redisStandaloneConfiguration);
        return lettuceConnectionFactory; // RedisConnectionFactory 빈 반환
    }

    /**
     * RedisTemplate 빈을 생성하는 메서드
     *
     * RedisTemplate은 Redis 서버와 데이터를 읽고 쓰기 위한 주요 인터페이스입니다.
     * Spring에서 제공하는 RedisTemplate은 Redis의 모든 자료 구조(문자열, 해시, 리스트, 집합 등)에 대해
     * 다양한 작업을 수행할 수 있는 방법을 제공합니다.
     * RedisTemplate은 제네릭을 사용하여 키와 값의 타입을 지정할 수 있으며, 이 예제에서는 키와 값을
     * 모두 문자열로 직렬화하도록 설정되어 있습니다.
     *
     * RedisTemplate은 내부적으로 RedisConnectionFactory를 사용하여 Redis 서버와 통신합니다.
     * 이 템플릿을 통해 Redis에 데이터를 저장하고 검색할 수 있습니다.
     *
     * @return RedisTemplate<String, Object>
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        // RedisTemplate 객체를 생성합니다.
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();

        // RedisConnectionFactory를 RedisTemplate에 설정합니다.
        // RedisTemplate이 Redis 서버와의 연결을 사용할 수 있도록 해줍니다.
        redisTemplate.setConnectionFactory(redisConnectionFactory());

        // Redis의 키와 값을 직렬화하는 방식을 설정합니다.
        // 여기서는 StringRedisSerializer를 사용하여 키와 값을 문자열로 직렬화합니다.
        // 이 설정은 Redis에 데이터를 저장할 때 직렬화 방식을 지정하는 것으로, 데이터 저장 형식을 정의합니다.
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());

        return redisTemplate; // RedisTemplate 빈 반환
    }
}