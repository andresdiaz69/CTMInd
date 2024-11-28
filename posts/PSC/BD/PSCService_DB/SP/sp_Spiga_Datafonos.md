# Stored Procedure: sp_Spiga_Datafonos

## Usa los objetos:
- [[vw_Spiga_Datafonos]]

```sql
create PROCEDURE [dbo].[sp_Spiga_Datafonos]
AS 
BEGIN

SELECT PkFkEmpresas,	PkFkCentros,		PkFkCajas,
	   PkCajas_Iden,	DescripcionCaja,	FkContCtas,
	   PkTpvs_Iden,		Descripcion,		FkCtaBancarias,
	   Codigo
  FROM vw_Spiga_Datafonos
END

```
