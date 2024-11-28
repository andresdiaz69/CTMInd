# View: vw_BibliotecaPer_ExcepcionesUnidadNegocio

## Usa los objetos:
- [[BibliotecaPer_Excepciones]]
- [[BibliotecaPer_Excepciones]]
- [[BibliotecaPer_UnidadNegocioExcepciones]]
- [[vw_Ultimo_Registro_EmpleadosActivos]]

```sql
CREATE VIEW [dbo].[vw_BibliotecaPer_ExcepcionesUnidadNegocio] AS
SELECT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY CedulaEmpleado)) AS INT),0) AS Id,NombreCompleto,CedulaEmpleado,CodUnidadNegocio,NombreUnidadNegocio,
Codigocentro,NombreCentro
FROM(
    SELECT NombreCompleto = B.NombreEmpleado,(BX.CodEmpleadoNoExistente)CedulaEmpleado,(BX.CodUnidadNegocio)CodUnidadNegocio,(BX.NombreUnidadNegocio)
	   NombreUnidadNegocio,(BX.CodCentro)Codigocentro,(BX.NombreCentro)NombreCentro
	FROM [dbo].[BibliotecaPer_UnidadNegocioExcepciones] BX
	LEFT JOIN BibliotecaPer_Excepciones B ON B.CedulaEmpleado = BX.CodEmpleadoNoExistente
	UNION ALL

	SELECT NombreCompleto = vwE.Nombres + ' ' + vwE.Apellido1 + ' ' + vwE.Apellido2,(BE.CedulaEmpleado)CedulaEmpleado, (vwE.Unidad_Negocio)CodUnidadNegocio,(vwE.Nombre_Unidad_Negocio)
	   NombreUnidadNegocio,(vwE.codigo_centro)Codigocentro,(vwE.nombre_centro)NombreCentro
	FROM [dbo].[BibliotecaPer_Excepciones] BE
	   JOIN vw_Ultimo_Registro_EmpleadosActivos vwE ON vwE.CodigoEmpleado = BE.CedulaEmpleado
	WHERE BE.Empleado = 1
	) b

```
