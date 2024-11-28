# View: v_Requisiciones_UnidadNegocio_Solicitante

## Usa los objetos:
- [[EmpleadosActivos]]
- [[JerarquiaEmpleados]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_UnidadNegocio_Solicitante] AS
SELECT distinct ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY cc_jefe1)) AS INT),0) id, cc_jefe1, CodUnidadNegocio, NombreUnidadNegocio, 
	CodCentro, NombreCentro, CodEmpresa, NombreEmpresa
FROM 
(
	SELECT  DISTINCT cc_jefe1,CodUnidadNegocio=Convert(char(10),n.CodUnidadNegocio),NombreUnidadNegocio=convert(varchar(100),n.NombreUnidadNegocio),
		CodCentro=Convert(char(10),n.CodCentro),NombreCentro=convert(varchar(100),n.NombreCentro),
		CodEmpresa=Convert(char(10),n.CodEmpresa),NombreEmpresa=convert(varchar(255),n.NombreEmpresa)
	FROM
	(
		SELECT  DISTINCT cc_jefe1=j.cc_jefe1, a.codigo_centro, a.nombre_centro
		FROM		jerarquiaempleados		j
		LEFT JOIN	EmpleadosActivos		a	ON	j.cedula = a.CodigoEmpleado AND Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())
		WHERE (CC_Jefe1 IS NOT NULL AND codigo_centro IS NOT NULL)
		UNION ALL
		SELECT DISTINCT  jefe=j.CC_Jefe2, a.codigo_centro, a.nombre_centro
		FROM		jerarquiaempleados		j
		LEFT JOIN	EmpleadosActivos		a	ON	j.cedula = a.CodigoEmpleado AND Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())
		WHERE (CC_Jefe2 IS NOT NULL AND codigo_centro IS NOT NULL)
		UNION ALL
		SELECT DISTINCT  jefe=j.CC_Jefe3, a.codigo_centro, a.nombre_centro
		FROM		jerarquiaempleados		j
		LEFT JOIN	EmpleadosActivos		a	ON	j.cedula = a.CodigoEmpleado AND Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())
		WHERE (CC_Jefe3 IS NOT NULL AND codigo_centro IS NOT NULL)
		UNION ALL
		SELECT  jefe=j.CC_Jefe4, a.codigo_centro, a.nombre_centro
		FROM		jerarquiaempleados		j
		LEFT JOIN	EmpleadosActivos		a	ON	j.cedula = a.CodigoEmpleado AND Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())
		WHERE (CC_Jefe4 IS NOT NULL AND codigo_centro IS NOT NULL)
		UNION ALL
		SELECT  jefe=j.CC_Jefe5, a.codigo_centro, a.nombre_centro
		FROM		jerarquiaempleados		j
		LEFT JOIN	EmpleadosActivos		a	ON	j.cedula = a.CodigoEmpleado AND Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())
		WHERE (CC_Jefe5 IS NOT NULL AND codigo_centro IS NOT NULL)
	) a  
	LEFT JOIN (
		select DISTINCT U.CodEmpresa, U.NombreEmpresa, CodCentro, NombreCentro, CodUnidadNegocio, 
			NombreUnidadNegocio = CASE WHEN CodUnidadNegocio = 15 THEN 'BELPPI CT'
									WHEN CodUnidadNegocio = 6 THEN U.NombreUnidadNegocio
									ELSE U2.NombreUnidadNegocio_Requisicion END
		from VW_UnidadDeNegocio u
		LEFT JOIN (
			SELECT DISTINCT UnidadNegocio_Requisicion, NombreUnidadNegocio_Requisicion 
			FROM vw_UnidadDeNegocio
		) u2 on u.CodUnidadNegocio = u2.UnidadNegocio_Requisicion
		WHERE CodEmpresa NOT IN (3)
	)	AS n ON a.codigo_centro = n.CodCentro 

	--LEFT JOIN Empresas			AS e ON n.CodEmpresa = e.CodigoEmpresa
	--where cc_jefe1 = --'437730'--		'55180119'
) b

```
