package com.springboot.config;

import com.springboot.auth.filter.JwtAuthenticationFilter;
import com.springboot.auth.filter.JwtVerificationFilter;
import com.springboot.auth.handler.MemberAccessDeniedHandler;
import com.springboot.auth.handler.MemberAuthenticationEntryPoint;
import com.springboot.auth.handler.MemberAuthenticationFailureHandler;
import com.springboot.auth.handler.MemberAuthenticationSuccessHandler;
import com.springboot.auth.jwt.JwtTokenizer;
import com.springboot.auth.utils.JwtAuthorityUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final JwtAuthorityUtils jwtAuthorityUtils;
    private final RedisTemplate<String, Object> redisTemplate;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, JwtAuthorityUtils jwtAuthorityUtils, RedisTemplate<String, Object> redisTemplate) {
        this.jwtTokenizer = jwtTokenizer;
        this.jwtAuthorityUtils = jwtAuthorityUtils;
        this.redisTemplate = redisTemplate;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .logout().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/logout").hasAnyRole("TL", "TM")
                        // 모든 테이블 조회는 팀장, 사원 가능.
                        .antMatchers(HttpMethod.GET,"/members").hasAnyRole("TL", "TM")
                        .antMatchers(HttpMethod.GET,"/orders").hasAnyRole("TL", "TM")
                        .antMatchers(HttpMethod.GET,"/items").hasAnyRole("TL", "TM")
                        .antMatchers(HttpMethod.GET,"/sales-prices").hasAnyRole("TL", "TM")
                        .antMatchers(HttpMethod.GET,"/customers").hasAnyRole("TL", "TM")
                        .antMatchers(HttpMethod.GET,"/order-histories").hasAnyRole("TL", "TM")
                        // 주문 등록은 팀장, 사원 가능.
                        .antMatchers(HttpMethod.POST,"/orders").hasAnyRole("TL", "TM")
                        // 마스터 테이블 등록은 팀장만 가능.
                        .antMatchers(HttpMethod.POST,"/items").hasRole("TL")
                        .antMatchers(HttpMethod.POST,"/sales-prices").hasRole("TL")
                        .antMatchers(HttpMethod.POST,"/customers").hasRole("TL")
                        // 주문 수정은 팀장, 사원 가능. 사원 > 내용 수정 가능. 팀장 > 권한 수정까지 가능.
                        .antMatchers(HttpMethod.PATCH,"/orders/**").hasAnyRole("TL", "TM")
                        // 마스터 테이블 수정은 팀장만 가능.
                        .antMatchers(HttpMethod.PATCH,"/items/**").hasRole("TL")
                        .antMatchers(HttpMethod.PATCH,"/sales-prices/**").hasRole("TL")
                        .antMatchers(HttpMethod.PATCH,"/customers/**").hasRole("TL")
                        // 삭제는 팀장만 가능.
                        .antMatchers(HttpMethod.DELETE,"/items/**").hasRole("TL")
                        .antMatchers(HttpMethod.DELETE,"/sales-prices/**").hasRole("TL")
                        .antMatchers(HttpMethod.DELETE,"/customers/**").hasRole("TL")
                        .antMatchers(HttpMethod.DELETE,"/orders/**").hasAnyRole("TL")
                        .anyRequest().permitAll()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        // 로그인 성공시 memberId 를 header 에 전달할 수도 있지만? 다른 방법이 더 낫다고.. 다른 방법을 생각해 봅세.
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Location"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure (HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager =
                    builder.getSharedObject(AuthenticationManager.class);
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, redisTemplate);
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, jwtAuthorityUtils, redisTemplate);


            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }

}
