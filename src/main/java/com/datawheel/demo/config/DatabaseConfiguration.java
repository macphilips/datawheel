package com.datawheel.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * This is a configuartion class for enabling database transaction and spring boot JPA
 */
@Configuration
@EnableJpaRepositories("com.datawheel.demo.repository")
@EnableTransactionManagement
public class DatabaseConfiguration {
}
