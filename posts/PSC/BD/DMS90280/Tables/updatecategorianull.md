# Table: updatecategorianull

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| FkClienteCategorias | smallint | YES |
| FkPagoFormas_Clte | nvarchar | YES |
| FkPagoFormas_Prov | nvarchar | YES |
| DiaPago1 | tinyint | YES |
| DiaPago2 | tinyint | YES |
| ExclusionPagoDesde | nvarchar | YES |
| ExclusionPagoHasta | nvarchar | YES |
| PorcDtoMateriales | decimal | YES |
| PorcDtoMOB | decimal | YES |
| PorcBeneficioMateriales | decimal | YES |
| PrecMOBChapa | decimal | YES |
| PrecMOBMecanica | decimal | YES |
| PrecMOBPintura | decimal | YES |
| DeshabilitarCredito | bit | NO |
| ExentoIva | bit | NO |
| CodigoConcesionario | nvarchar | YES |
| CodigoProvedor | nvarchar | YES |
| CodigoAgente | nvarchar | YES |
| Observaciones | nvarchar | YES |
| IncluirParaEncuestas | bit | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkIdioma_Facturas | nvarchar | YES |
| FkNegocioTipos | nvarchar | YES |
| FechaAlta | datetime | NO |
| Colaborador | bit | NO |
| FkSubtipoClientes | nvarchar | YES |
| Importador | bit | NO |
| FechaMod | datetime | NO |
| PermitirFacturarEntradas | bit | NO |
| PermitirFacturarSalidas | bit | NO |
| DelegacionTirea | nvarchar | YES |
| PorcDtoMatPintura | decimal | YES |
| SalidasAlmWeb | bit | NO |
| UserAlta | smallint | YES |
| NoPermitePedidosProveedor | bit | NO |
| PermiteOtrasMonedas | bit | NO |
| FkMonedas_Factura | smallint | YES |
| FkEmpleados_VendedorRecambios | smallint | YES |
| PrecioDtoEspecificosMateriales | bit | NO |
| PorcDtoTrabajosExternos | decimal | YES |
| PorcDtoVarios | decimal | YES |
| ImporteConsumidoExterno | decimal | YES |
| FechaLimitePago | datetime | YES |
| PermiteModificarIVAVentasRE | bit | NO |
| PorcIncrementoPVP | decimal | YES |
| PorcEmbalajes | decimal | YES |
| ImpMinEmbalaje | decimal | YES |
| ImpMaxEmbalaje | decimal | YES |
| PorcComision | decimal | YES |
