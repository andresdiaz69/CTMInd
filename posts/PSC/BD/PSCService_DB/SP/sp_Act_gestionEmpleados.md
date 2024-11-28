# Stored Procedure: sp_Act_gestionEmpleados

## Usa los objetos:
- [[Empresas]]
- [[Jerarquia_EmpleadosNoNomina]]
- [[Jerarquia_EmpleadosNoNomina_Info]]
- [[JerarquiaEmpleados]]
- [[UnidadDeNegocio]]
- [[vw_empleados]]

```sql

--DROP PROCEDURE sp_Act_gestionEmpleados 
CREATE PROCEDURE [dbo].[sp_Act_gestionEmpleados] 
 @numero VARCHAR(30) AS
SELECT DISTINCT
       nombre_empleado,   identificacion_empleado,   email_corporativo_empleado,   celular_corporativo_empleado,    email_personal_empleado,  celular_personal_empelado
      ,empresa_empelado,  codigo_empresa_empleado,   unidad_de_negocio_empleado,   codigo_unidad_negocio_empleado,  cargo_empleado,           codigo_cargo_empleado 
      ,nombre_jefe,       identificacion_jefe,       CASE WHEN email_corporativo_jefe = '' THEN NULL ELSE email_corporativo_jefe END AS email_corporativo_jefe,       
	  celular_corporativo_jefe, CASE WHEN email_personal_jefe = '' THEN NULL ELSE email_personal_jefe END AS email_personal_jefe
	  ,      celular_personal_jefe
	  ,empresa_jefe,      codigo_empresa_jefe,        unidad_de_negocio_jefe,       codigo_unidad_negocio_jefe,      cargo_jefe,               Codigo_Cargo_jefe
FROM(
			  SELECT nombre_empleado = NomEmp, identificacion_empleado = a.Cedula 
					, email_corporativo_empleado =  a.Email_Corporativo,      celular_corporativo_empleado   =  a.Cel_corporativo   
					, email_personal_empleado    =  a.email,                  
					
					-- celular_personal_empelado      =  a.Cel_personal  
					celular_personal_empelado      =  a.Celular -- JCS - 2022/07/26: El Celular Personal viene realmente de este campo

					, empresa_empelado           =  a.Nombre_Compañia,        codigo_empresa_empleado        =  a.Codigo_Compañia 
					, unidad_de_negocio_empleado =  a.Nombre_Unidad_Negocio,  codigo_unidad_negocio_empleado =  a.Unidad_Negocio 
					, cargo_empleado             =  a.Nombre_Cargo,           codigo_cargo_empleado          =  a.Codigo_Cargo  
					, nombre_jefe= CASE WHEN c.Nombres+' '+ c.apellido1 +' '+c.apellido2 IS NULL 
					THEN (SELECT d.Nombre FROM [DBMLC_0190].dbo.Jerarquia_EmpleadosNoNomina d WHERE a.CC_Jefe1=d.Cedula ) 
					ELSE c.Nombres+' '+ c.apellido1 +' '+c.apellido2
					END
					, identificacion_jefe = a.CC_Jefe1
					, email_corporativo_jefe = CASE WHEN c.Email_Corporativo IS NULL 
					THEN (SELECT d.EmailCorporativo FROM [DBMLC_0190].dbo.Jerarquia_EmpleadosNoNomina_Info d WHERE a.CC_Jefe1=d.Cedula ) 
					ELSE c.Email_Corporativo
					END
					, celular_corporativo_jefe = CASE WHEN c.Cel_corporativo IS NULL 
					THEN (SELECT d.CelularCorporativo FROM [DBMLC_0190].dbo.Jerarquia_EmpleadosNoNomina_Info d WHERE a.CC_Jefe1=d.Cedula ) 
					ELSE c.Cel_corporativo
					END
					, email_personal_jefe   = c.email
					, celular_personal_jefe = c.Cel_personal
					, empresa_jefe = CASE WHEN (SELECT TOP 1 e.NombreEmpresa FROM [DBMLC_0190].dbo.Empresas e WHERE e.CodigoEmpresa = (SELECT TOP 1 d.CodEmpresa FROM [DBMLC_0190].dbo.UnidadDeNegocio d WHERE d.CodSeccion=a.codigo_seccion) ) IS NULL
					THEN (SELECT TOP 1 e.NombreEmpresa FROM [DBMLC_0190].dbo.Empresas e WHERE e.CodigoEmpresa = (SELECT TOP 1 d.CodEmpresa FROM [DBMLC_0190].dbo.UnidadDeNegocio d LEFT JOIN [DBMLC_0190].dbo.Jerarquia_EmpleadosNoNomina_Info r ON d.CodSeccion=r.IdSeccion))
					ELSE (SELECT TOP 1 e.NombreEmpresa FROM [DBMLC_0190].dbo.Empresas e WHERE e.CodigoEmpresa = (SELECT TOP 1 d.CodEmpresa FROM [DBMLC_0190].dbo.UnidadDeNegocio d WHERE d.CodSeccion=a.codigo_seccion) )
					END
					, codigo_empresa_jefe = CASE WHEN (SELECT TOP 1 d.CodEmpresa FROM [DBMLC_0190].dbo.UnidadDeNegocio d WHERE d.CodSeccion=a.codigo_seccion) IS NULL
					THEN (SELECT TOP 1 d.CodEmpresa FROM [DBMLC_0190].dbo.UnidadDeNegocio d LEFT JOIN [DBMLC_0190].dbo.Jerarquia_EmpleadosNoNomina_Info r ON d.CodSeccion=r.IdSeccion)
					ELSE (SELECT TOP 1 d.CodEmpresa FROM [DBMLC_0190].dbo.UnidadDeNegocio d WHERE d.CodSeccion=a.codigo_seccion)
					END
					, unidad_de_negocio_jefe = CASE WHEN C.Nombre_Unidad_Negocio IS NULL 
					THEN (SELECT d.UnidadNegocio FROM [DBMLC_0190].dbo.Jerarquia_EmpleadosNoNomina_Info d WHERE a.CC_Jefe1=d.Cedula ) 
					ELSE C.Nombre_Unidad_Negocio
					END
				   , codigo_unidad_negocio_jefe = CASE WHEN c.Unidad_Negocio IS NULL 
					THEN (SELECT d.IdUnidadNegocio FROM [DBMLC_0190].dbo.Jerarquia_EmpleadosNoNomina_Info d WHERE a.CC_Jefe1=d.Cedula ) 
					ELSE c.Unidad_Negocio 
					END
					, cargo_jefe = CASE WHEN c.Nombre_Cargo IS NULL 
					THEN (SELECT d.Cargo FROM [DBMLC_0190].dbo.Jerarquia_EmpleadosNoNomina_Info d WHERE a.CC_Jefe1=d.Cedula ) 
					ELSE c.Nombre_Cargo
					END
					, Codigo_Cargo_jefe = CASE WHEN c.Codigo_Cargo IS NULL 
					THEN (SELECT d.IdCargo FROM [DBMLC_0190].dbo.Jerarquia_EmpleadosNoNomina_Info d WHERE a.CC_Jefe1=d.Cedula ) 
					ELSE c.Codigo_Cargo
					END
		 FROM(
				 SELECT c.Cedula, NomEmp =c.Nombres+' '+ c.apellido1 +' '+c.apellido2, c.codigo_seccion, c.Email_Corporativo
				 , c.Cel_corporativo ,c.email, 
				 
				 -- c.Cel_personal, 
				 c.Celular, -- JCS - 2022/07/26: El Celular Personal viene realmente de este campo
				 
				 c.Nombre_Compañia,  c.Codigo_Compañia ,c.Nombre_Unidad_Negocio
				 , c.Unidad_Negocio, c.Nombre_Cargo, c.Codigo_Cargo  
				 , b.CC_Jefe1
				 FROM		[PSCService_DB].dbo.vw_empleados c
				 LEFT JOIN  [DBMLC_0190].dbo.JerarquiaEmpleados b ON c.Cedula=b.Cedula
				 WHERE  c.Estado in ('Activo','Medio Tiempo') AND c.Codigo_Cargo  <> '120'
				 --and c.cedula='1022407647'
			)a
	 LEFT JOIN [PSCService_DB].dbo.vw_empleados c ON c.Cedula=a.CC_Jefe1
	 --where a.cedula='1022407647'
  )b 
WHERE identificacion_empleado = @numero

```
