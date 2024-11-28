# View: vw_cMandos_HorasImproductivas

## Usa los objetos:
- [[spiga_HorasImproductivas]]

```sql







CREATE VIEW [dbo].[vw_cMandos_HorasImproductivas]
AS
SELECT        Ano_Periodo, Mes_Periodo, IdEmpresa AS CodigoEmpresa, 
case when IdCentro = 28 and IdEmpresa = 1 then 28000+IdSeccion --28355 
	 when IdCentro = 28 and IdEmpresa = 6 then 28000+IdSeccion --28354 
	 else IdCentro end CodigoCentro, IdSeccion CodigoSeccion,
	 Departamento, HorasImproductivas
FROM            PSCService_DB.dbo.spiga_HorasImproductivas

```
