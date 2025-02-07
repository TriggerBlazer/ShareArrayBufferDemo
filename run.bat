@echo off
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
cd /d "%~dp0"

echo 请确保安装了Certbot，如未安装可以前往下载 https://github.com/certbot/certbot/releases/download/v2.9.0/certbot-beta-installer-win_amd64_signed.exe
echo 脚本作者by.yanhy2000
echo 申请证书需要准备一个邮箱，邮箱第一次申请会自动注册，只需要两次输入"y"并回车即可
echo 验证证书需要手动添加修改DNS的TXT记录
set /p email="请输入您的邮箱地址: "
set /p domain="请输入您的域名: "

certbot certonly -m %email% -d "%domain%" -d %domain% --manual --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory

if %errorlevel% neq 0 (
    echo 证书申请过程中发生错误。
    pause
    exit /b %errorlevel%
)

echo 证书申请成功。
pause