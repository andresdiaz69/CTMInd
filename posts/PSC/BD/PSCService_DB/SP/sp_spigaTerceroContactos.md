# Stored Procedure: sp_spigaTerceroContactos

## Usa los objetos:
- [[vw_SpigaTerceroContactos]]

```sql
CREATE PROCEDURE [dbo].[sp_spigaTerceroContactos]
AS
BEGIN 

SELECT PkFkTerceros, PkFkTerceros_Contactos, CapacidadCompra, UserMod, FechaMod, Principal
  FROM vw_SpigaTerceroContactos

 END

```
