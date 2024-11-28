# View: vw_cMandos_HorasFacturadasMO

## Usa los objetos:
- [[spiga_HorasFacturadasMO]]

```sql








CREATE VIEW [dbo].[vw_cMandos_HorasFacturadasMO]
AS

	SELECT Ano_Periodo, Mes_Periodo, IdEmpresa AS CodigoEmpresa, 
	case when IdCentro = 28 and IdEmpresa = 1 then 28000+IdSeccion --28355 
		 when IdCentro = 28 and IdEmpresa = 6 then 28000+IdSeccion --28354 
		 else IdCentro end CodigoCentro, IdSeccion CodigoSeccion,
		 Departamento, ISNULL(HorasFacturadasMO,0) Valor
	FROM  PSCService_DB..spiga_HorasFacturadasMO


```
