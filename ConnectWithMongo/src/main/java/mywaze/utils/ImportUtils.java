package mywaze.utils;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class ImportUtils {
    public static List<String> lines(File file) throws IOException {
        return Files.readAllLines(file.toPath());
    }

    public static List<String> linesFromResource(String resource) throws IOException {
        Resource input = new ClassPathResource(resource);
        Path path = input.getFile().toPath();
        return Files.readAllLines(path);
    }
}
