# View: vw_cMandos_HorasProductivas

## Usa los objetos:
- [[spiga_HorasProductivas]]

```sql






CREATE VIEW [dbo].[vw_cMandos_HorasProductivas]
AS
	SELECT        Ano_Periodo, Mes_Periodo, IdEmpresa AS CodigoEmpresa, 
	case when IdCentro = 28 and IdEmpresa = 1 then 28000+IdSeccion --28355 
		 when IdCentro = 28 and IdEmpresa = 6 then 28000+IdSeccion --28354 
		 else IdCentro end CodigoCentro, isnull(IdSeccion,0) CodigoSeccion, 
		 Departamento, HorasProductivas
	FROM            PSCService_DB.dbo.spiga_HorasProductivas


```
