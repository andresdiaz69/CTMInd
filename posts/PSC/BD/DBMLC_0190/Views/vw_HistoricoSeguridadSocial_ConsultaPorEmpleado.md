# View: vw_HistoricoSeguridadSocial_ConsultaPorEmpleado

## Usa los objetos:
- [[HistoricoSeguridadSocialCT]]
- [[HistoricoSeguridadSocialMM]]

```sql





CREATE VIEW [dbo].[vw_HistoricoSeguridadSocial_ConsultaPorEmpleado] AS
SELECT id, NIT, Compañia, Año, Periodo, Fondo_Pension, Cedula, Apellido, Nombres, NombreCompleto, Salario_Basico, IBC_Pension, Aporte_Pension, Dias_Pension, IGE, ING, IRP, Incapac_ATEP, Incapac_EG, LMA, Licencia, Maternidad 
 FROM
  (
	  SELECT id,NIT, Compañia, Año, Periodo, Fondo_Pension, Cedula, Apellido, Nombres, NombreCompleto, Salario_Basico, IBC_Pension, Aporte_Pension, Dias_Pension, IGE, ING, IRP, Incapac_ATEP, Incapac_EG, LMA, Licencia, Maternidad 
	  FROM (
		select id,NIT, Compañia, Año, Periodo, Fondo_Pension, RTRIM(Cedula)as Cedula, Apellido, Nombres, Nombres+' '+Apellido AS NombreCompleto, Salario_Basico, IBC_Pension, Aporte_Pension, Dias_Pension, IGE, ING, CONVERT(nvarchar(250),IRP)as IRP, Incapac_ATEP, Incapac_EG, LMA,Licencia, Maternidad from HistoricoSeguridadSocialCT
		union all
		select id,NIT, Compañia, Año, Periodo, Fondo_Pension, RTRIM(Cedula)as Cedula, Apellidos, Nombres, Nombres+' '+Apellidos AS NombreCompleto, basico_mes_grl, ibc_pension_afp, vr_pension_afp, dias_pension_afp, ige_afp, ing_grl, irp_arp, vr_inca_acc_arp, vr_inca_grl_eps, lma_afp, vr_licencia_eps, vr_inca_grl_eps from HistoricoSeguridadSocialMM)as t

	  UNION ALL

	  SELECT ''id,NIT, Compañia, ''Año, null Periodo, null Fondo_Pension, Cedula, null Apellido, null Nombres, null NombreCompleto, null Salario_Basico, null IBC_Pension, null Aporte_Pension, null Dias_Pension, null IGE, null ING, null IRP, null Incapac_ATEP, null Incapac_EG, null LMA, null Licencia, null Maternidad 
	  FROM 
	  (
		select id,NIT, Compañia, Año, Periodo, Fondo_Pension, RTRIM(Cedula)as Cedula, Apellido, Nombres, Nombres+' '+Apellido AS NombreCompleto, Salario_Basico, IBC_Pension, Aporte_Pension, Dias_Pension, IGE, ING, CONVERT(nvarchar(250),IRP)as IRP, Incapac_ATEP, Incapac_EG, LMA,Licencia, Maternidad from HistoricoSeguridadSocialCT
		union all
		select id,NIT, Compañia, Año, Periodo, Fondo_Pension, RTRIM(Cedula)as Cedula, Apellidos, Nombres, Nombres+' '+Apellidos AS NombreCompleto, basico_mes_grl, ibc_pension_afp, vr_pension_afp, dias_pension_afp, ige_afp, ing_grl, irp_arp, vr_inca_acc_arp, vr_inca_grl_eps, lma_afp, vr_licencia_eps, vr_inca_grl_eps from HistoricoSeguridadSocialMM
	  )as c
	  GROUP BY NIT, Compañia, Cedula
  )AS A


```
