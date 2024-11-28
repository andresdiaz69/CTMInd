# View: vw_Retencion_Clientes

## Usa los objetos:
- [[vw_Retencion_Clientes_Pasos_por_Taller]]
- [[vw_Retencion_Clientes_Vehi_Entregados]]

```sql
--DROP VIEW VW_Retencion_Clientes
CREATE VIEW [dbo].[vw_Retencion_Clientes] AS
SELECT DISTINCT CodigoEmpresa, Empresa, CodigoCentro, Centro, CodUnidadNegocio, NombreUnidadNegocio, CodigoMarca, Marca, CodigoGama, 
Gama, NombreTercero, Nit, email, fijo, celular, FechaEntregaCliente, NombreVendedor, VIN, tabla
FROM(
	 SELECT CodigoEmpresa, Empresa, CodigoCentro, Centro, CodUnidadNegocio, NombreUnidadNegocio, CodigoMarca, Marca, CodigoGama
		  , Gama, NombreTercero, Nit, email, fijo, celular, FechaEntregaCliente, NombreVendedor, VIN, tabla='Entregas'
	 FROM vw_Retencion_Clientes_Vehi_Entregados
     UNION ALL 
	 SELECT CodigoEmpresa, Empresa, CodigoCentro, Centro, CodUnidadNegocio, NombreUnidadNegocio, CodigoMarca, Marca, CodigoGama, 
	 Gama, NombreTercero, NifCif, email, fijo, celular,  FechaEntrada, NombreVendedor, VIN, tabla='PasosTaller'
	 FROM vw_Retencion_Clientes_Pasos_Por_Taller
)a

```
