# Stored Procedure: sp_Se_Compliance

## Usa los objetos:
- [[Compliance]]

```sql

CREATE PROCEDURE [dbo].[sp_Se_Compliance]
@IdEmpresa int,
@Ano int,
@Mes int

AS
BEGIN

DELETE FROM Compliance
 WHERE Empresa = @IdEmpresa 
   AND Ano	   = @Ano
   AND Mes	   = @Mes

END

```
