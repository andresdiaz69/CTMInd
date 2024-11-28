# View: V_HDK_Usuario_Cliente_Usu_Pdto

## Usa los objetos:
- [[Hdk_Usu_Pdto]]
- [[Hdk_Usuario_Cliente]]

```sql

CREATE VIEW [dbo].[V_HDK_Usuario_Cliente_Usu_Pdto]
AS SELECT ucl.Id_Usuario,
		ucl.Id_ClienteLic AS Cod_Cliente,
		ucl.cod_emp AS Cod_Empleado,
		upd.Id_Int_Producto AS Id_producto
   FROM Hdk_Usuario_Cliente AS ucl
   INNER JOIN Hdk_Usu_Pdto AS upd ON ucl.Id_Usuario = upd.Id_Usuario;


```
