# View: v_Requisiciones_Centro_Solicitante

## Usa los objetos:
- [[EmpleadosActivos]]
- [[JerarquiaEmpleados]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Centro_Solicitante] as
select  DISTINCT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY cc_jefe1)) AS INT),0) id,cc_jefe1,codigo_centro,nombre_centro
from(
		SELECT  DISTINCT cc_jefe1=j.cc_jefe1, a.codigo_centro, a.nombre_centro
		FROM		jerarquiaempleados		j
		LEFT JOIN	EmpleadosActivos		a	ON	j.cedula = a.CodigoEmpleado AND Ano_Periodo = YEAR(GETDATE()) and Mes_Periodo = MONTH(GETDATE())
		WHERE (CC_Jefe1 IS NOT NULL AND codigo_centro IS NOT NULL)
		
		UNION ALL
		
		SELECT DISTINCT  jefe=j.CC_Jefe2, a.codigo_centro, a.nombre_centro
		FROM		jerarquiaempleados		j
		LEFT JOIN	EmpleadosActivos		a	ON	j.cedula = a.CodigoEmpleado AND Ano_Periodo = YEAR(GETDATE()) and Mes_Periodo = MONTH(GETDATE())
		WHERE (CC_Jefe2 IS NOT NULL AND codigo_centro IS NOT NULL)
	
		UNION ALL

		SELECT DISTINCT  jefe=j.CC_Jefe3, a.codigo_centro, a.nombre_centro
		FROM		jerarquiaempleados		j
		LEFT JOIN	EmpleadosActivos		a	ON	j.cedula = a.CodigoEmpleado AND Ano_Periodo = YEAR(GETDATE()) and Mes_Periodo = MONTH(GETDATE())
		WHERE (CC_Jefe3 IS NOT NULL AND codigo_centro IS NOT NULL)

		UNION ALL

		SELECT  jefe=j.CC_Jefe4, a.codigo_centro, a.nombre_centro
		FROM		jerarquiaempleados		j
		LEFT JOIN	EmpleadosActivos		a	ON	j.cedula = a.CodigoEmpleado AND Ano_Periodo = YEAR(GETDATE()) and Mes_Periodo = MONTH(GETDATE())
		WHERE (CC_Jefe4 IS NOT NULL AND codigo_centro IS NOT NULL)

		UNION ALL

		SELECT  jefe=j.CC_Jefe5, a.codigo_centro, a.nombre_centro
		FROM		jerarquiaempleados		j
		LEFT JOIN	EmpleadosActivos		a	ON	j.cedula = a.CodigoEmpleado AND Ano_Periodo = YEAR(GETDATE()) and Mes_Periodo = MONTH(GETDATE())
		WHERE (CC_Jefe5 IS NOT NULL AND codigo_centro IS NOT NULL)
) a

```
