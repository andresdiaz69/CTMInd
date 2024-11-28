# View: vw_AnticiposPendientesClientes

## Usa los objetos:
- [[spiga_AnticiposClientesPendientes]]

```sql
CREATE VIEW [dbo].[vw_AnticiposPendientesClientes] AS
SELECT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY  Empresa)) AS INT),0) id, Ano_Periodo,Mes_Periodo,Empresa,CodRecibo,CodigoTercero,Tercero,CodCentro,Centro,Fechaalta, 
	ImporteRecibo,ImporteVinculado,Diferencia,NIF,Cuenta,Saldo,Estado
FROM 
(
	SELECT DISTINCT Ano_Periodo,Mes_Periodo,Empresa,CodRecibo,CodigoTercero,Tercero,CodCentro,Centro,Fechaalta,ImporteRecibo,ImporteVinculado,Diferencia,
			NIF,Cuenta,Saldo,Estado
	FROM 
	(
		SELECT  Ano_Periodo,Mes_Periodo,Empresa,CodRecibo,CONVERT(nvarchar(20),CodTercero)CodigoTercero,Tercero,CodCentro,Centro,Fechaalta,ImporteRecibo,ImporteVinculado,Diferencia,
			NIF,Cuenta,Saldo2805051105y2805051110 as Saldo,Estado
		FROM  [PSCService_DB].[dbo].spiga_AnticiposClientesPendientes with (nolock)
	) A
) A --WHERE Empresa = 1 and CodigoTercero = 528305

```
