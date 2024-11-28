# Stored Procedure: sp_ConsultaHistoricoSaldos

## Usa los objetos:
- [[DianSpiga_HistoricoSaldosEquivalencia]]

```sql


CREATE PROCEDURE [dbo].[sp_ConsultaHistoricoSaldos]
@CodEmpresa int,
@Año		int

AS
BEGIN
SELECT Ano_periodo,			CodEmpresa,			Tipo_Documento,		
	   Folio,				Prefijo,			Fecha_Emision, 
	   Fecha_Recepcion,		NombreEmpresa,		Codigo,
	   Nit_tercero,			NombreEmisor,		IVA,					
	   Total,				PrefijoFolio_FacturaEquivalente 
  FROM DianSpiga_HistoricoSaldosEquivalencia
 WHERE CodEmpresa	= @CodEmpresa
   AND Ano_periodo	= @Año

END

```
