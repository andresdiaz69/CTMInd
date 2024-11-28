# View: vw_cMandos_MOFacturada

## Usa los objetos:
- [[spiga_MOFacturada]]

```sql




CREATE VIEW [dbo].[vw_cMandos_MOFacturada]
AS
SELECT        Ano_Periodo, Mes_Periodo, IdEmpresa AS CodigoEmpresa, NombreEmpresa, 
	case when IdCentro = 28 and IdEmpresa = 1 then 28000+IdSeccion --28355 
		 when IdCentro = 28 and IdEmpresa = 6 then 28000+IdSeccion --28354 
		 else IdCentro end CodigoCentro,
	IdSeccion CodigoSeccion, NombreCentro, Departamento, CosteMOTrabajo, ImporteMOTrabajo, ImporteMOFacturado, ImporteSUBTrabajo, 
    ImporteSUBFacturado, ImporteVARTrabajo, ImporteVARFacturado, ImportePINTTrabajo, ImportePINTFacturado, ImporteMATTrabajo, ImporteMATFacturado, ImporteFranquicia
FROM            PSCService_DB.dbo.spiga_MOFacturada

```
