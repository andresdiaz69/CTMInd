# Stored Procedure: sp_CruceDianPtesaSaldos

## Usa los objetos:
- [[DianPtesaSaldos]]

```sql







CREATE PROCEDURE [dbo].[sp_CruceDianPtesaSaldos]
@Ano_periodo int,
@CodEmpresa int,
@Emisor_ID varchar(50),
@UUID varchar(200)
AS
BEGIN 
DELETE FROM DianPtesaSaldos
WHERE  Ano_periodo = @Ano_periodo AND CodEmpresa = @CodEmpresa AND Emisor_ID = @Emisor_ID AND UUID = @UUID
END

```
