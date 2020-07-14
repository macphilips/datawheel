package com.datawheel.demo.config;

import com.datawheel.demo.aop.LoggingAspect;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

/**
 * This is a configuration class that enables spring-boot AOP.
 */
@Configuration
@EnableAspectJAutoProxy
public class LoggingAspectConfiguration {
    /**
     * Create a loggingAspect bean
     * @return LoggingAspect
     */
    @Bean
    public LoggingAspect loggingAspect() {
        return new LoggingAspect();
    }
}
