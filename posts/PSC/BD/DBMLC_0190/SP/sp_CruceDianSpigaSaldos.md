# Stored Procedure: sp_CruceDianSpigaSaldos

## Usa los objetos:
- [[DianSpigaSaldos]]

```sql










CREATE PROCEDURE [dbo].[sp_CruceDianSpigaSaldos]
@CodEmpresa smallint,
@Ano_periodo int,
@Numero varchar(200),
@Prefijo varchar(200),
@Codigo bigint
AS
BEGIN 
DELETE FROM DianSpigaSaldos
WHERE CodEmpresa = @CodEmpresa AND Ano_periodo = @Ano_periodo AND Numero = @Numero AND Prefijo = @Prefijo AND Codigo = @Codigo

END

```
