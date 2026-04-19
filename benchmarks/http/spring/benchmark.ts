import { runHttpBenchmark } from "../runner";

await runHttpBenchmark({
  name: "Spring Boot",
  buildCmd: ["gradle", "bootJar", "-q"],
  startCmd: ["java", "-jar", "build/libs/spring-0.0.1.jar"],
  cwd: import.meta.dir,
});
