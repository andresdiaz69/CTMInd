# View: vw_ConsultaIndemnizaciones

## Usa los objetos:
- [[EmpleadosActivos]]
- [[v_MLC_indemnizaciones_Gerentes]]

```sql
CREATE VIEW [dbo].[vw_ConsultaIndemnizaciones] AS
SELECT B.Ano_Periodo, B.Mes_Periodo, A.CodigoEmpleado, A.nombres AS NombreEmpleado, B.CodigoEmpresa, B.Empresa, B.CodigoMarca, B.Marca, B.Unidad_Negocio,
	B.Nombre_Unidad_Negocio, CONVERT(smallint, B.codigo_centro) AS codigo_centro, B.nombre_centro, CONVERT(smallint, B.codigo_seccion) AS codigo_seccion, 
	B.nombre_seccion, B.Fecha_Ingreso, A.NombreConcepto, A.Valor

FROM v_MLC_indemnizaciones_Gerentes				AS A

INNER JOIN (SELECT * FROM EmpleadosActivos
			WHERE Ano_Periodo = YEAR(GETDATE()) 
			AND Mes_Periodo = MONTH(GETDATE()))	AS B ON A.CodigoEmpleado = B.CodigoEmpleado

```
