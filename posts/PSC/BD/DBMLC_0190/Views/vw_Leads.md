# View: vw_Leads

## Usa los objetos:
- [[EmpleadosActivos]]
- [[Leads]]

```sql

CREATE VIEW [dbo].[vw_Leads]
AS
SELECT        dbo.Leads.IdSincronizacionApi, dbo.Leads.IdConsecutivo, dbo.Leads.Ano_Periodo, dbo.Leads.Mes_Periodo, dbo.Leads.id_av, dbo.Leads.nombre, dbo.Leads.email, dbo.Leads.telefono, dbo.Leads.ciudad, dbo.Leads.vendedor, 
                         dbo.Leads.fuente, dbo.Leads.sitio, dbo.Leads.fecha, dbo.Leads.periodo, dbo.Leads.fecha_actualizacion, dbo.Leads.descripcion_actualizacion, dbo.Leads.asesor_actualizacion, dbo.Leads.asesor_documento, 
                         ISNULL(ASESOR.asesor_nombre, 'NO REGISTRA NOMBRE') AS asesor_nombre, dbo.Leads.estado_actualizacion, dbo.Leads.fecha_primera_gestion, dbo.Leads.mlc_identificacion, dbo.Leads.mlc_telefono, dbo.Leads.mlc_linea, dbo.Leads.mlc_ciudad, dbo.Leads.extra1_key, 
                         dbo.Leads.extra1_value, dbo.Leads.extra2_key, dbo.Leads.extra2_value, dbo.Leads.extra3_key, dbo.Leads.extra3_value, dbo.Leads.extra4_key, dbo.Leads.extra4_value, dbo.Leads.extra5_key, dbo.Leads.extra5_value, 
                         dbo.Leads.extra6_key, dbo.Leads.extra6_value, dbo.Leads.extra7_key, dbo.Leads.extra7_value, dbo.Leads.extra8_key, dbo.Leads.extra8_value, dbo.Leads.extra9_key, dbo.Leads.extra9_value, dbo.Leads.extra10_key, 
                         dbo.Leads.extra10_value
FROM            dbo.Leads LEFT OUTER JOIN
                             (SELECT        CodigoEmpleado, ISNULL(Nombres, N'') + ' ' + ISNULL(Apellido1, N'') + ' ' + ISNULL(Apellido2, N'') AS asesor_nombre
                               FROM            dbo.EmpleadosActivos
                               GROUP BY CodigoEmpleado, Nombres, Apellido1, Apellido2) AS ASESOR ON dbo.Leads.asesor_documento = ASESOR.CodigoEmpleado

```
