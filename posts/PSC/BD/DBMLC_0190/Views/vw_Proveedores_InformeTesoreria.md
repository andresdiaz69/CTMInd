# View: vw_Proveedores_InformeTesoreria

## Usa los objetos:
- [[Proveedores_Factura]]
- [[Proveedores_ParametrizacionProveedores]]

```sql
CREATE VIEW [dbo].[vw_Proveedores_InformeTesoreria]
AS
SELECT DISTINCT PF.IdProveedoresFactura,Linea = 'ADMINISTRACION',Codigo = P.CodigoSpiga,RazonSocial = P.NombreProveedor,
PF.Valor,Preliquidado = CONVERT(nvarchar, PF.NumeroAsientoContable),Numero = PF.NumeroFactura,
Fecha = PF.FechaVencimiento,Concepto =  'TECNOLOGIA'
FROM Proveedores_Factura PF
JOIN Proveedores_ParametrizacionProveedores P ON P.Nit = PF.CodProveedor
WHERE PF.FechaPago IS NULL

```
