# Stored Procedure: sp_Se_ArchivoPtesa

## Usa los objetos:
- [[ArchivoPtesa]]

```sql


CREATE PROCEDURE [dbo].[sp_Se_ArchivoPtesa]
@CodEmpresa int,
@Mes_periodo int,
@Ano_periodo int
AS
BEGIN 
DELETE FROM ArchivoPtesa
WHERE CodEmpresa = @CodEmpresa AND MONTH(Emision) = @Mes_periodo AND YEAR(Emision) = @Ano_Periodo
END

```
