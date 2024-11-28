# Stored Procedure: sp_Se_SpigaDianSaldos

## Usa los objetos:
- [[SpigaDianSaldos]]

```sql




CREATE PROCEDURE [dbo].[sp_Se_SpigaDianSaldos]
@CodEmpresa int,
@Mes_periodo int,
@Ano_periodo int
AS
BEGIN 
DELETE FROM SpigaDianSaldos
WHERE CodEmpresa = @CodEmpresa AND Mes_periodo = @Mes_periodo AND Ano_periodo = @Ano_Periodo
END

```
