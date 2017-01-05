@echo off
REM =====================================
REM    UglifyJS
REM
REM     - by cx
REM     - 2012-05-03
REM =====================================
SETLOCAL ENABLEEXTENSIONS

echo.
echo UglifyJS 

REM �����ļ���׺��ֻѹ�� js �� css
if "%~x1" NEQ ".js" (
    if "%~x1" NEQ ".css" (
        if "%~x1" NEQ ".jsp" (
            echo.
            echo **** ��ѡ�� CSS��JS��JSP�ļ�
            echo.
            goto End
        )
    )
)


REM ����ѹ������ļ���������Ϊ��
REM 1. �ļ����� .source ʱ: filename.source.js -> filename.js
REM 2. ���������filename.js -> filename-min.js
set RESULT_FILE=%~n1-min%~x1
dir /b "%~f1" | find ".source." > nul
if %ERRORLEVEL% == 0 (
    for %%a in ("%~n1") do (
        set RESULT_FILE=%%~na%~x1
    )
)

REM ���� uglifyjs ѹ���ļ�

node "%~dp0\bin\uglifyjs" %~nx1 > %RESULT_FILE%



REM ��ʾѹ�����
if %ERRORLEVEL% == 0 (
    echo.
    echo ѹ���ļ� %~nx1 �� %RESULT_FILE% 
    for %%a in ("%RESULT_FILE%") do (
        echo �ļ���С�� %~z1 bytes ѹ���� %%~za bytes
    )
    echo.
) else (
    echo.
    echo **** �ļ� %~nx1 ����д����������ϸ���
    echo.
	goto End
)
goto End


:End
ENDLOCAL
pause
