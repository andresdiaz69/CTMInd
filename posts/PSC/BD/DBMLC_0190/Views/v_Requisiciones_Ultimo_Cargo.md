# View: v_Requisiciones_Ultimo_Cargo

## Usa los objetos:
- [[Cargos]]
- [[v_Requisiciones_EmpleadosActivosRetirados]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Ultimo_Cargo] AS
SELECT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY  CodigoEmpleado)) AS INT),0) id,CodigoEmpleado,NombreCompleto,codigo_cargo,nombre_cargo,unidad_negocio,
	nombre_unidad_negocio,CodigoMarca,Marca,CodigoEmpresa,Empresa,codigo_centro,nombre_centro,codigo_seccion,nombre_seccion,codigo_departamento, 
	nombre_departamento,Codigo_Sucursal,Nombre_Sucursal
FROM 
(
	SELECT DISTINCT CodigoEmpleado,NombreCompleto,codigo_cargo,nombre_cargo,unidad_negocio,nombre_unidad_negocio,CodigoMarca,Marca,CodigoEmpresa,
		Empresa,codigo_centro,nombre_centro,codigo_seccion,nombre_seccion,codigo_departamento, nombre_departamento,Codigo_Sucursal,Nombre_Sucursal
	FROM
	(
		SELECT DISTINCT estado,CodigoEmpleado,NombreCompleto,codigo_cargo,nombre_cargo,unidad_negocio,nombre_unidad_negocio,CodigoMarca,Marca,CodigoEmpresa,Empresa, 
			codigo_centro, nombre_centro,codigo_seccion, nombre_seccion, codigo_departamento, nombre_departamento, Codigo_Sucursal, Nombre_Sucursal
		FROM
		(
			SELECT orden=ROW_NUMBER() OVER (PARTITION BY codigoempleado ORDER BY numero DESC),Ano_Periodo,Mes_Periodo,unidad_negocio,nombre_unidad_negocio,
				CodigoMarca,Marca,CodigoEmpresa,Empresa,codigo_seccion,nombre_seccion,Codigo_Sucursal,Nombre_Sucursal,estado,CodigoEmpleado,NombreCompleto,
				Codigo_Cargo,Nombre_Cargo,codigo_centro,nombre_centro,codigo_departamento,nombre_departamento
			FROM
			(
				SELECT numero=ano_periodo+CASE WHEN mes_periodo in (1,2,3,4,5,6,7,8,9) THEN '0'+mes_periodo ELSE mes_periodo END,Ano_Periodo,Mes_Periodo, 
					estado,CodigoEmpleado,NombreCompleto=Nombres + ' ' + Apellido1 + ' ' + Apellido2,Codigo_Cargo,Nombre_Cargo,CodigoMarca,Marca,CodigoEmpresa,
					Empresa,codigo_seccion,nombre_seccion,Codigo_Sucursal,Nombre_Sucursal,codigo_centro,nombre_centro,codigo_departamento,nombre_departamento,
					unidad_negocio,nombre_unidad_negocio					
				FROM v_Requisiciones_EmpleadosActivosRetirados
				WHERE estado = 'ACTIVO' 	
					AND Ano_Periodo = YEAR(GETDATE())
					AND Mes_Periodo = MONTH(GETDATE())
					AND Nombre_Cargo NOT LIKE '%(NA)%'
				UNION ALL
				SELECT  numero=ano_periodo+CASE WHEN mes_periodo in (1,2,3,4,5,6,7,8,9) THEN '0'+mes_periodo ELSE mes_periodo END, Ano_Periodo,Mes_Periodo,
					estado,CodigoEmpleado,NombreCompleto = Nombres + ' ' + Apellido1 + ' ' + Apellido2,Codigo_Cargo,Nombre_Cargo,CodigoMarca,Marca,CodigoEmpresa,
					Empresa,codigo_seccion,nombre_seccion,Codigo_Sucursal,Nombre_Sucursal,codigo_centro,nombre_centro,codigo_departamento,nombre_departamento,
					unidad_negocio,nombre_unidad_negocio
				FROM v_Requisiciones_EmpleadosActivosRetirados 
				WHERE estado= 'RETIRADO'
					AND Nombre_Cargo NOT LIKE '%(NA)%'
					AND Ano_Periodo >= YEAR(GETDATE())-1
			)a  
		) b 
		WHERE orden = 1
	)c 
	LEFT JOIN cargos s2	ON s2.CodigoCargo = c.Codigo_Cargo
	WHERE s2.NombreCargo NOT LIKE '(NA)%'
) A

```
