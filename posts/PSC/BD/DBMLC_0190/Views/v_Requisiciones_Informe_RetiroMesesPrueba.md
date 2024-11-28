# View: v_Requisiciones_Informe_RetiroMesesPrueba

## Usa los objetos:
- [[EmpleadosRetirados]]
- [[v_Requisiciones_SolicitudesCandidatos]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Informe_RetiroMesesPrueba] AS
SELECT Estado,Cedula,NombreCompleto,Telefono,Celular,Correo,Direccion,NombreCargo,Fecha_Ingreso,Fecha_retiro,CausaRetiro
FROM 
(
	SELECT DISTINCT b.Estado,a.Cedula,a.NombreCompleto,a.Telefono,a.Celular,a.Correo,a.Direccion,a.NombreCargo,b.Fecha_Ingreso,		
		b.Fecha_retiro, DATEADD(MONTH,-2,Fecha_retiro)as fecha,b.CausaRetiro
	FROM v_Requisiciones_SolicitudesCandidatos AS a
	LEFT JOIN 
	(
		SELECT Estado = 'Retirado', * 
		FROM EmpleadosRetirados 
		WHERE YEAR(Fecha_Ingreso) >= 2020
	) AS b ON a.Cedula = b.CodigoEmpleado
	WHERE IdEstadoCandidato = 8 AND Estado IS NOT NULL 
)A
WHERE (Fecha_Ingreso >= fecha and Fecha_Ingreso <= Fecha_retiro)

```
