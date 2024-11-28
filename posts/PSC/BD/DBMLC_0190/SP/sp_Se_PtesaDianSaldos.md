# Stored Procedure: sp_Se_PtesaDianSaldos

## Usa los objetos:
- [[PtesaDianSaldos]]

```sql



CREATE PROCEDURE [dbo].[sp_Se_PtesaDianSaldos]
@CodEmpresa int,
@Mes_periodo int,
@Ano_periodo int
AS
BEGIN 
DELETE FROM PtesaDianSaldos
WHERE CodEmpresa = @CodEmpresa AND Mes_periodo = @Mes_periodo AND Ano_periodo = @Ano_Periodo
END

```
