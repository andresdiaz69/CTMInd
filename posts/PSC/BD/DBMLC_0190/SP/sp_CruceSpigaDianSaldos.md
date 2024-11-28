# Stored Procedure: sp_CruceSpigaDianSaldos

## Usa los objetos:
- [[SpigaDianSaldos]]

```sql











CREATE PROCEDURE [dbo].[sp_CruceSpigaDianSaldos]
@CodEmpresa smallint,
@Ano_periodo int,
@Numero nvarchar(200),
@Prefijo nvarchar(200),
@Nit_Tercero bigint 

AS
BEGIN 
DELETE FROM SpigaDianSaldos
WHERE Numero = @Numero AND Prefijo = @Prefijo AND CodEmpresa = @CodEmpresa AND Ano_periodo = @Ano_periodo AND Nit_Tercero = @Nit_Tercero

END

```
