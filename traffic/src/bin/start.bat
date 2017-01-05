@echo off
echo [Pre-Requirement] Makesure install JDK 6.0+ and set the JAVA_HOME.
echo [Pre-Requirement] Makesure install Maven 3.0.3+ and set the PATH.
echo [Pre-Requirement] Makesure install hgcore module already.

set MAVEN_OPTS=%MAVEN_OPTS% -XX:MaxPermSize=128m

echo [Step 1] Initialize schema and data for project.
call mvn flyway:init flyway:migrate
if errorlevel 1 goto error

echo [Step 2] Start projects.
mvn clean jetty:run 
if errorlevel 1 goto error

echo [INFO] Please wait a moment. Then you can browse： "http://localhost:8080/quickstart"。
goto end

:error
echo Error Happen!!
:end
pause