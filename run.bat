@echo off
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
cd /d "%~dp0"

echo ��ȷ����װ��Certbot����δ��װ����ǰ������ https://github.com/certbot/certbot/releases/download/v2.9.0/certbot-beta-installer-win_amd64_signed.exe
echo �ű�����by.yanhy2000
echo ����֤����Ҫ׼��һ�����䣬�����һ��������Զ�ע�ᣬֻ��Ҫ��������"y"���س�����
echo ��֤֤����Ҫ�ֶ�����޸�DNS��TXT��¼
set /p email="���������������ַ: "
set /p domain="��������������: "

certbot certonly -m %email% -d "%domain%" -d %domain% --manual --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory

if %errorlevel% neq 0 (
    echo ֤����������з�������
    pause
    exit /b %errorlevel%
)

echo ֤������ɹ���
pause