# View: vw_cMandos_CosteMOFacturada

## Usa los objetos:
- [[spiga_CosteMOFacturada]]

```sql





CREATE VIEW [dbo].[vw_cMandos_CosteMOFacturada]
AS
SELECT distinct Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresa AS CodigoEmpresa, NombreEmpresa, 
	case when IdCentro = 28 and IdEmpresa = 1 then 28000+IdSeccion --28355 
		 when IdCentro = 28 and IdEmpresa = 6 then 28000+IdSeccion --28354 
		 else IdCentro end CodigoCentro,
	IdSeccion CodigoSeccion, NombreCentro, Departamento, CosteMOTrabajo
FROM            PSCService_DB.dbo.spiga_CosteMOFacturada 

```
