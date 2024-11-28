# Stored Procedure: sp_HistoricoSaldos

## Usa los objetos:
- [[SpigaDianSaldos]]

```sql


CREATE PROCEDURE [dbo].[sp_HistoricoSaldos]
@Cod_Empresa int,
@Nit varchar(150),
@Prefijo varchar(150),
@Numero varchar(150)

AS
BEGIN 
DELETE SpigaDianSaldos
 WHERE CodEmpresa	= @Cod_Empresa 
   AND Nit_tercero	= @Nit
   AND Prefijo		= @Prefijo
   AND Numero		= @Numero
END

```
