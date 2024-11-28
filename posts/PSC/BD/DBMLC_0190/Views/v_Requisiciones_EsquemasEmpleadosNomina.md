# View: v_Requisiciones_EsquemasEmpleadosNomina

## Usa los objetos:
- [[v_esquemas_por_cargo]]
- [[v_MLC_consulta_empleados_activos]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_EsquemasEmpleadosNomina] AS
SELECT	DISTINCT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY Cedula)) AS INT),0) AS Id,
		Cedula,			Nombres,			CodCargo,			CodEmpresa,			CodUnidad,			CodCentro,		CodSeccion, 
		NombreCargo,	NombreEmpresa,		NombreUnidad,		NombreCentro,		NombreSeccion,		NumEsquema,		NombreEsquema = MAX(NombreEsquema)
FROM
(
	SELECT	DISTINCT		Cedula,				Nombres,			CodCargo,			CodEmpresa,			CodUnidad,			CodCentro,		
			CodSeccion,		NombreCargo,		NombreEmpresa,		NombreUnidad,		NombreCentro,		NombreSeccion,		NombreEsquema,
			NumEsquema = CASE WHEN NumEsquema = 'Esquema1' THEN 1 
							  WHEN NumEsquema = 'Esquema2' THEN 2 
							  WHEN NumEsquema = 'Esquema3' THEN 3 
							  WHEN NumEsquema = 'Esquema4' THEN 4 
							  WHEN NumEsquema = 'Esquema5' THEN 5 
							  WHEN NumEsquema = 'Esquema6' THEN 6 END
	FROM (
		SELECT Cedula  = LTRIM(RTRIM(CONVERT(NVARCHAR(50),A.Cedula))),		
			CodCargo   = LTRIM(RTRIM(CONVERT(NVARCHAR(50),A.Codigo_Cargo))),				NombreCargo   = LTRIM(RTRIM(CONVERT(NVARCHAR(50),A.Nombre_Cargo))),
			CodEmpresa = LTRIM(RTRIM(CONVERT(NVARCHAR(50),A.Codigo_Compañia))),				NombreEmpresa = LTRIM(RTRIM(CONVERT(NVARCHAR(50),A.Nombre_Compañia))),
			CodUnidad  = LTRIM(RTRIM(CONVERT(NVARCHAR(50),A.Unidad_Negocio))),				NombreUnidad  = LTRIM(RTRIM(CONVERT(NVARCHAR(50),A.Nombre_Unidad_Negocio))),
			CodCentro  = LTRIM(RTRIM(CONVERT(NVARCHAR(50),A.codigo_centro))),				NombreCentro  = LTRIM(RTRIM(CONVERT(NVARCHAR(50),A.nombre_centro))),
			CodSeccion = LTRIM(RTRIM(CONVERT(NVARCHAR(50),A.codigo_seccion))),				NombreSeccion = LTRIM(RTRIM(CONVERT(NVARCHAR(50),A.nombre_seccion))),
			Esquema1   = REPLACE(REPLACE(REPLACE(C.Esquema1,' ','<>'),'><',''),'<>',' '),	Esquema2      = REPLACE(REPLACE(REPLACE(C.Esquema2,' ','<>'),'><',''),'<>',' '),
			Esquema3   = REPLACE(REPLACE(REPLACE(C.Esquema3,' ','<>'),'><',''),'<>',' '),	Esquema4      = REPLACE(REPLACE(REPLACE(C.Esquema4,' ','<>'),'><',''),'<>',' '),
			Esquema5   = REPLACE(REPLACE(REPLACE(C.Esquema5,' ','<>'),'><',''),'<>',' '),	Esquema6      = REPLACE(REPLACE(REPLACE(C.Esquema6,' ','<>'),'><',''),'<>',' '),
			Nombres    = REPLACE(REPLACE(REPLACE(CONCAT(Nombres,' ',apellido1,' ',apellido2),' ','<>'),'><',''),'<>',' ')
		FROM [Novasoft_CT_MM].[dbo].[v_MLC_consulta_empleados_activos]	A
		LEFT JOIN [dbo].[v_esquemas_por_cargo]							C ON C.codigoempleado = A.cedula	
	) A	
	UNPIVOT
	(
		NombreEsquema FOR NumEsquema IN (Esquema1, Esquema2, Esquema3, Esquema4, Esquema5, Esquema6)
	) AS UnpivotedTable
)A
WHERE NombreEsquema IS NOT NULL AND NombreEsquema <> ''
GROUP BY	Cedula,					Nombres,				CodCargo,				CodEmpresa,					CodUnidad,		
			CodCentro,				CodSeccion, 			NombreCargo,			NombreEmpresa,				NombreUnidad,
			NombreCentro,			NombreSeccion,			NumEsquema

```
