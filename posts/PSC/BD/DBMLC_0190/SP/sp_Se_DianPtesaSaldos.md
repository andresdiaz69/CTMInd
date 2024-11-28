# Stored Procedure: sp_Se_DianPtesaSaldos

## Usa los objetos:
- [[DianPtesaSaldos]]

```sql



CREATE PROCEDURE [dbo].[sp_Se_DianPtesaSaldos]
@CodEmpresa int,
@Mes_periodo int,
@Ano_periodo int
AS
BEGIN 
DELETE FROM DianPtesaSaldos
WHERE CodEmpresa = @CodEmpresa AND Mes_periodo = @Mes_periodo AND Ano_periodo = @Ano_Periodo
END

```
