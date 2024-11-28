# Stored Procedure: sp_Se_DianSpigaSaldos

## Usa los objetos:
- [[DianSpigaSaldos]]

```sql




CREATE PROCEDURE [dbo].[sp_Se_DianSpigaSaldos]
@CodEmpresa int,
@Mes_periodo int,
@Ano_periodo int
AS
BEGIN 
DELETE FROM DianSpigaSaldos
WHERE CodEmpresa = @CodEmpresa AND Mes_periodo = @Mes_periodo AND Ano_periodo = @Ano_Periodo
END

```
