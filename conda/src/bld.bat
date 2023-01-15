mkdir %PREFIX%\Scripts\client
mkdir %PREFIX%\Scripts\client\cores
mkdir %PREFIX%\Scripts\client\cores
mkdir %PREFIX%\bin\client
mkdir %PREFIX%\bin\client\cores
xcopy %cd%\WindWaker %PREFIX%\Scripts\client\cores /E/H
xcopy %cd%\WindWaker %PREFIX%\bin\client\cores /E/H