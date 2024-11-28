# Stored Procedure: sp_Se_ArchivoDian

## Usa los objetos:
- [[ArchivoDian]]

```sql



CREATE PROCEDURE [dbo].[sp_Se_ArchivoDian]
@CodEmpresa int,
@Mes_periodo int,
@Ano_periodo int
AS
BEGIN 
DELETE FROM ArchivoDian
WHERE CodEmpresa = @CodEmpresa AND MONTH(FechaEmision) = @Mes_periodo AND YEAR(FechaEmision) = @Ano_Periodo
END

```
