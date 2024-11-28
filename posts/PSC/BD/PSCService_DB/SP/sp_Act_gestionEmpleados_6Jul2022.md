# Stored Procedure: sp_Act_gestionEmpleados_6Jul2022

## Usa los objetos:
- [[JerarquiaEmpleados]]
- [[vw_empleados]]

```sql

CREATE procedure [dbo].[sp_Act_gestionEmpleados_6Jul2022] 
@numero	varchar(15)
as
BEGIN
SET NOCOUNT ON;
SELECT 
     (EN.Nombres+' '+EN.apellido1+' '+EN.apellido2) AS 'nombre_empleado'
	, LTRIM(RTRIM(EN.Cedula)) AS 'identificacion_empleado'
    , EN.Email_Corporativo  AS 'email_corporativo_empleado'
    , EN.Cel_corporativo  AS 'celular_corporativo_empleado'
    , EN.email  AS 'email_personal_empleado'
    , EN.Celular  AS 'celular_personal_empelado'
    , EN.Nombre_Compañia  AS 'empresa_empelado'
    , LTRIM(RTRIM(EN.Codigo_Compañia))  AS 'codigo_empresa_empleado'
    , LTRIM(RTRIM(EN.Nombre_Unidad_Negocio))  AS 'unidad_de_negocio_empleado'
    , LTRIM(RTRIM(EN.Unidad_Negocio))  AS 'codigo_unidad_negocio_empleado'
    , LTRIM(RTRIM(EN.Nombre_Cargo))  AS 'cargo_empleado'
    , LTRIM(RTRIM(EN.Codigo_Cargo))  AS 'codigo_cargo_empleado'
	 ,(select EN2.Nombres +' '+EN2.apellido1+' '+RTRIM(EN2.apellido2)
	 from [PSCService_DB].dbo.vw_empleados  EN2
	 where EN2.Cedula=JE.CC_Jefe1	 
	 )as 'nombre_jefe'
	 ,JE.CC_Jefe1 as 'identificacion_jefe'
    ,(select LTRIM(RTRIM(EN2.Email_Corporativo))
	 from [PSCService_DB].dbo.vw_empleados  EN2
	 where EN2.Cedula=JE.CC_Jefe1	 
	 )as 'email_corporativo_jefe'
    ,(select LTRIM(RTRIM(EN2.Cel_corporativo))
	 from [PSCService_DB].dbo.vw_empleados  EN2
	 where EN2.Cedula=JE.CC_Jefe1	 
	 )as 'celular_corporativo_jefe'
    ,(select LTRIM(RTRIM(EN2.email))
	 from [PSCService_DB].dbo.vw_empleados  EN2
	 where EN2.Cedula=JE.CC_Jefe1	 
	 )as 'email_personal_jefe'
    ,(select LTRIM(RTRIM(EN2.Cel_personal))
	 from [PSCService_DB].dbo.vw_empleados  EN2
	 where EN2.Cedula=JE.CC_Jefe1	 
	 )as 'celular_personal_jefe'
    ,(select LTRIM(RTRIM(EN2.Nombre_Compañia))
	 from [PSCService_DB].dbo.vw_empleados  EN2
	 where EN2.Cedula=JE.CC_Jefe1	 
	 )as 'empresa_jefe'
    ,(select LTRIM(RTRIM(EN2.Codigo_Compañia))
	 from [PSCService_DB].dbo.vw_empleados  EN2
	 where EN2.Cedula=JE.CC_Jefe1	 
	 )as 'codigo_empresa_jefe'
   ,(select LTRIM(RTRIM(EN2.Nombre_Unidad_Negocio))
	 from [PSCService_DB].dbo.vw_empleados  EN2
	 where EN2.Cedula=JE.CC_Jefe1	 
	 )as 'unidad_de_negocio_jefe'
   ,(select LTRIM(RTRIM(EN2.Unidad_Negocio))
	 from [PSCService_DB].dbo.vw_empleados  EN2
	 where EN2.Cedula=JE.CC_Jefe1	 
	 )as 'codigo_unidad_negocio_jefe'
   ,(select LTRIM(RTRIM(EN2.Nombre_Cargo))
	 from [PSCService_DB].dbo.vw_empleados  EN2
	 where EN2.Cedula=JE.CC_Jefe1	 
	 )as 'cargo_jefe'
   ,(select LTRIM(RTRIM(EN2.Codigo_Cargo))
	 from [PSCService_DB].dbo.vw_empleados  EN2
	 where EN2.Cedula=JE.CC_Jefe1	 
	 )as 'codigo_cargo_jefe' 
FROM [DBMLC_0190].dbo.JerarquiaEmpleados JE
    ,[PSCService_DB].dbo.vw_empleados  EN
WHERE JE.Cedula=EN.Cedula
AND  EN.Cedula = @numero
 END

```
