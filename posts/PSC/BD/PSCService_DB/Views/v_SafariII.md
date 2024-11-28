# View: v_SafariII

## Usa los objetos:
- [[CentrosDirecciones]]
- [[CentrosMunicipios]]
- [[ComisionesSpigaVNFechaFactura]]
- [[spiga_TipoClasificacionesVehiculos]]
- [[Tramite_Ciudades]]
- [[Tramite_Departamentos]]
- [[Vw_safarii_datos_terceros]]
- [[vw_vehiculos_Cilindraje]]

```sql
CREATE  VIEW [dbo].[v_SafariII] AS
SELECT DISTINCT Codigoempresa,  empresa,           NumeroFactura,       FechaFactura,     Pais, 
       VitrinaDepartamento,     VitrinaCiudad,     DireccionDeVenta,    VitrinaVenta,     VIN,
	   CodigoModelo,            NombreModelo,      AñoModelo,           PrecioVehiculo,   PrecioLista,
	   ValorDescuento,          ImporteImpuestos,  TotalFactura,        NombreDelCliente, 
	   TelefonoDelCliente= replace(replace(replace(replace(replace(replace(TelefonoDelCliente,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
	   DireccionDelCliente= replace(replace(replace(replace(replace(replace(DireccionDelCliente,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),    
	   CiudadCliente,     DepartamentoCliente, Cilindrada,       NombreClasificacion,
	   cantidadPasajeros,       CapacidadDeCarga 
  FROM (SELECT DISTINCT v.Codigoempresa,          v.empresa,                         v.NumeroFactura,                  v.FechaFactura, 
               Pais='Colombia',                   VitrinaDepartamento=d.descripcion, VitrinaCiudad=t.descripcion,      DireccionDeVenta=c.Direccion,
			   VitrinaVenta=v.Centro,             v.VIN,                             v.CodigoModelo,                   NombreModelo=v.modelo,
	           v.AñoModelo,                       v.PrecioVehiculo,                  v.PrecioLista,                    ValorDescuento=v.ValorDto, 
			   v.ImporteImpuestos,                v.TotalFactura ,                   NombreDelCliente=v.nombreTercero, TelefonoDelCliente= g.telefono, 	
	           g.Direccion DireccionDelCliente,   CiudadCliente=g.ciudad,            DepartamentoCliente=g.provincia,  h.Cilindrada,  
			   o.NombreClasificacion,             o.cantidadPasajeros,               o.CapacidadDeCarga,			   v.Ano_Periodo,  
			   v.Mes_Periodo 
	      FROM [DBMLC_0190].dbo.ComisionesSpigaVNFechaFactura v
	      LEFT JOIN [DBMLC_0190].dbo.CentrosDirecciones c ON v.CodigoCentro = c.CodigoCentro
	      LEFT JOIN [DBMLC_0190].dbo.CentrosMunicipios  m ON v.CodigoCentro = m.CodigoCentro 
		                                                 AND v.Codigoempresa = m.CodigoEmpresa
	      LEFT JOIN [DBMLC_0190].dbo.Tramite_Departamentos d	ON m.CodigoDepartamento = d.departamento
          LEFT JOIN [DBMLC_0190].dbo.Tramite_Ciudades t ON m.CodigoCiudad =t.Ciudad 
		                                               AND m.CodigoDepartamento = t.departamento   --82.111--81.667--82.708	--81.327  
	      LEFT JOIN [DBMLC_0190].dbo.Vw_safarii_datos_terceros g ON g.NifCif=v.Nit    
	      LEFT JOIN (SELECT vin, Cilindrada 
	                   FROM [DBMLC_0190].dbo.vw_vehiculos_Cilindraje) h ON h.vin = v.VIN	
          LEFT JOIN (SELECT NombreClasificacion, CantidadPasajeros, CapacidadDeCarga, PkAnoModelo, PkCodModelo 
	                   FROM [PSCService_DB].[dbo].spiga_TipoClasificacionesVehiculos 
	                  WHERE (CantidadPasajeros IS NOT NULL) OR (CapacidadDeCarga IS NOT NULL)  
				    )o ON v.CodigoModelo COLLATE DATABASE_DEFAULT = o.PkCodModelo 
				      AND o.PkAnoModelo  COLLATE DATABASE_DEFAULT = v.AñoModelo
)a
-- where NumeroFactura = 'N155/573/2024'
--and Mes_Periodo = 1
--AND Ano_Periodo = 2024


```
