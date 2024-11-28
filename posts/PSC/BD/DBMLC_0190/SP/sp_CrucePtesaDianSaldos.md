# Stored Procedure: sp_CrucePtesaDianSaldos

## Usa los objetos:
- [[PtesaDianSaldos]]

```sql



CREATE PROCEDURE [dbo].[sp_CrucePtesaDianSaldos]
@Ano_periodo int,
@CodEmpresa int,
@Emisor_ID varchar(50),
@UUID varchar(200)
AS
BEGIN 
DELETE FROM PtesaDianSaldos
WHERE  Ano_periodo = @Ano_periodo AND CodEmpresa = @CodEmpresa AND Emisor_ID = @Emisor_ID AND UUID = @UUID
END

```
