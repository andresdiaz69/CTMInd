# Table: _LaFloresta_Mig_Referencias

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMR | nvarchar | NO |
| PkReferencias | nvarchar | NO |
| PermiteGarantia | bit | NO |
| Habilitado | bit | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| FkFabricantes | smallint | YES |
| CodigoLlave | bit | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkEnvaseTipos | smallint | YES |
| Peso | numeric | YES |
| Caducidad | bit | NO |
| FechaMod | datetime | NO |
| ReferenciaLimpia | nvarchar | NO |
| ReferenciaEuroCare | bit | NO |
| ReferenciaExtraCare | bit | NO |
| FkUnidadesMedida | int | NO |
| NoReferencia | bit | NO |
| ReferenciaServiceBox | nvarchar | YES |
| EficienciaEnergetica | nvarchar | YES |
| AdherenciaMojado | nvarchar | YES |
| CategoriaRuido | nvarchar | YES |
| RuidoExterior | nvarchar | YES |
| Alto | numeric | YES |
| Ancho | numeric | YES |
| Largo | numeric | YES |
| FkPartidaArancelaria | nvarchar | YES |
| MaterialRestitucion | nvarchar | YES |
| Volumen | numeric | YES |
| CodigoICE | nvarchar | YES |
| RequiereCertificacion | bit | NO |
| ImportacionRestringida | bit | NO |
| DescripcionMinima | nvarchar | YES |
| ControlLotes | bit | NO |
| CodificacionAutomaticaLotes | bit | NO |
| ImprimirEtiquetasLotes | bit | NO |
| AsignacionAutoFechaCaducidadLotes | bit | YES |
| DiasCaducidadLotes | smallint | YES |
| FkFechaOrigenCaducidadLotes | tinyint | YES |
| DiametroLlanta | numeric | YES |
| DiametroNeumatico | numeric | YES |
| TipoConstruccion | nvarchar | YES |
| IndiceCarga | nvarchar | YES |
| IndiceVelocidad | nvarchar | YES |
| NumDirectiva | nvarchar | YES |
| FkReferencias_Condicionada | nvarchar | YES |
| RequiereVinEnPedidosMarca | bit | NO |
| DevolucionEnGarantia | bit | YES |
| Origen | nvarchar | YES |
