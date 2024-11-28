# View: vw_HistoricoSeguridadSocialNovedades_ConsultaPorEmpleado

## Usa los objetos:
- [[HistoricoSeguridadSocialNovedades]]

```sql

CREATE VIEW [dbo].[vw_HistoricoSeguridadSocialNovedades_ConsultaPorEmpleado] AS
SELECT ID, Nit, Compania, Cedula, RTRIM(Nombre1)+' '+RTRIM(Nombre2)+' '+RTRIM(Apellido1)+' '+RTRIM(Apellido2) as NombreCompleto, Cargo, FechaRetiro, FechaInicio, FechaFinal, Concepto, Descripcion, NroHoras, DiasPagos, Deducido, Devengado FROM  HistoricoSeguridadSocialNovedades
union all
SELECT ''ID, Nit, Compania, Cedula,  null NombreCompleto, null Cargo, null FechaRetiro, null FechaInicio, null FechaFinal, null Concepto, null Descripcion, null NroHoras, null DiasPagos, null Deducido, null Devengado FROM  HistoricoSeguridadSocialNovedades
GROUP BY Nit, Compania, Cedula

```
