# View: vw_cMandos_HorasProductivasFacturadas

## Usa los objetos:
- [[spiga_HorasProductivasFacturadas]]

```sql








CREATE VIEW [dbo].[vw_cMandos_HorasProductivasFacturadas]
AS

	SELECT Ano_Periodo, Mes_Periodo, IdEmpresa AS CodigoEmpresa, 
	case when IdCentro = 28 and IdEmpresa = 1 then 28000+IdSeccion -- 28355 
		 when IdCentro = 28 and IdEmpresa = 6 then 28000+IdSeccion -- 28354 
		 else IdCentro end CodigoCentro, idSeccion CodigoSeccion,
		 Departamento, isnull(HorasProductivasFacturadas,0) Valor
	FROM  PSCService_DB..spiga_HorasProductivasFacturadas


```
