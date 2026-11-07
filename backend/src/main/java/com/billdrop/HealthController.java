package com.billdrop;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    private final JdbcTemplate jdbc;

    public HealthController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // GET /api/health -> tells the page if server and database are alive
    @GetMapping("/api/health")
    public Map<String, String> health() {
        Map<String, String> result = new LinkedHashMap<>();
        result.put("server", "up");
        try {
            jdbc.queryForObject("SELECT 1", Integer.class);
            result.put("database", "up");
        } catch (Exception e) {
            result.put("database", "down");
        }
        return result;
    }
}
